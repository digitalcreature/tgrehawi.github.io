# Projects
This page is going to show a bunch of my projects (when I actually put them here). For now it's a stylin testing grounds.

Here's some code:
```cpp
#include <cstdio>
#include "lua5.1/lua.hpp"
#include "Leap.h"

using namespace std;
using namespace Leap;

typedef lua_State *Lua;

int leap_load(Lua L) {
	lua_getglobal(L, "leap");
	lua_getfield(L, -1, "controller");
	if (lua_isnil(L, -1)) {
		Controller *controller = new Controller();
		lua_pushlightuserdata(L, controller);
		lua_setfield(L, 1, "controller");
		return 0;
	}
	else {
		lua_pushliteral(L, "leap has already been loaded");
		return 1;
	}
}
```
More code:
```cpp
void pushvector(Lua L, const Vector &vec, float scale) {
	lua_createtable(L, 0, 3);
	lua_pushnumber(L, vec.x * scale); lua_setfield(L, -2, "x");
	lua_pushnumber(L, vec.y * scale); lua_setfield(L, -2, "y");
	lua_pushnumber(L, vec.z * scale); lua_setfield(L, -2, "z");
}
void pushvector(Lua L, const Vector &vec) { pushvector(L, vec, 0.1f); }

int leap_frame(Lua L) {
	lua_getglobal(L, "leap");
	lua_getfield(L, -1, "controller");
	Controller *controller = (Controller *) lua_touserdata(L, -1);
	lua_settop(L, 0);
	Frame frame = controller->frame();
	if (frame.isValid()) {
		lua_newtable(L);
		HandList hands = frame.hands();
		lua_createtable(L, hands.count(), 0);
		for (int h = 0; h < hands.count(); h ++) {
			Hand hand = hands[h];
			FingerList fingers = hand.fingers();
			lua_createtable(L, fingers.count(), 1);
			lua_pushinteger(L, hand.id()); lua_setfield(L, -2, "id");
			for (int f = 0; f < fingers.count(); f ++) {
				Finger finger = fingers[f];
				Vector tip = finger.tipPosition();
				lua_createtable(L, 5, 2);
				lua_pushinteger(L, finger.id()); lua_setfield(L, -2, "id");
				pushvector(L, tip); lua_setfield(L, -2, "tip");
				int b = 0;
				while (b < 4) {
					Bone::Type type = static_cast<Bone::Type>(b);
					Bone bone = finger.bone(type);
					if (bone.isValid()) {
						pushvector(L, bone.prevJoint()); lua_rawseti(L, -2, b + 1);
					}
					else {
						break;
					}
					b ++;
				}
				pushvector(L, tip); lua_rawseti(L, -2, b + 1);
				lua_rawseti(L, -2, f + 1);
			}
			lua_rawseti(L, -2, h + 1);
		}
		lua_setfield(L, -2, "hands");
		return 1;
	}
	else {
		return 0;
	}
}

extern "C" {
	int luaopen_leaplua(Lua L) {
		luaL_Reg lib[] = {
			{ "load", leap_load },
			{ "frame", leap_frame },
			{ NULL, NULL }
		};
		luaL_register(L, "leap", lib);
		return 1;
	}
}

```
Here is some inline code: `print "Hello, World!"`
Heres some `text` with `unnecessary` code styling.

Lua code:
```lua
require "leaplua"

function love.load()
	leap.load()
end

local frame

function love.update()
	frame = leap.frame()
end

local viewsize = 15
local planedistance = 30

local function project(vec)
	if -vec.z >= planedistance then
		return 0, 0, 0
	else
		local x = vec.x
		local y = - vec.y + 20
		local z = (vec.z + planedistance) / planedistance
		return x * z, y * z, z
	end
end

local function drawvec(mode, vec, radius)
	radius = radius or 1
	local x, y, z = project(vec)
	love.graphics.push()
		love.graphics.translate(x, y)
		love.graphics.scale(z)
		love.graphics.circle(mode, 0, 0, radius, 24)
	love.graphics.pop()
end

local function drawline(vecA, vecB)
	local xA, yA, zA = project(vecA)
	local xB, yB, zB = project(vecB)
	love.graphics.line(xA, yA, xB, yB)
end

function love.draw()
	if frame then
		local w, h = love.graphics.getDimensions()
		local text = ""
		love.graphics.push()
		love.graphics.translate(w / 2, h / 2)
		local ppcm = h / viewsize
		love.graphics.scale(ppcm)
		love.graphics.setLineWidth(1/ppcm)
		love.graphics.setColor(255, 255, 255)
		for h, hand in ipairs(frame.hands) do
			text = text..string.format("hand %d:\n", hand.id)
			for f, finger in ipairs(hand) do
				text = text..string.format("\tfinger %d:\n", finger.id)
				local lastjoint = nil
				for j, joint in ipairs(finger) do
					text = text..string.format("\t\tjoint %d: (%d, %d, %d)\n", j, joint.x, joint.y, joint.z)
					drawvec("fill", joint, 1/2)
					if lastjoint then
						drawline(lastjoint, joint)
					end
					lastjoint = joint
				end
				drawvec("line", finger.tip)
			end
		end
		for h, hand in ipairs(frame.hands) do
			for f, finger in ipairs(hand) do
				local x, y, z = project(finger.tip)
				love.graphics.setColor(0, 255, 255)
				love.graphics.print(finger.id, x + 1, y, 0, 1/ppcm, 1/ppcm)
			end
		end
		love.graphics.pop()
		love.graphics.print(text)
	else
		love.graphics.print("invalid frame")
	end
end
```

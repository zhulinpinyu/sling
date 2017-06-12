defmodule Sling.UserRoomView do
  use Sling.Web, :view

  def render("index.json", %{user_rooms: user_rooms}) do
    %{data: render_many(user_rooms, Sling.UserRoomView, "user_room.json")}
  end

  def render("show.json", %{user_room: user_room}) do
    %{data: render_one(user_room, Sling.UserRoomView, "user_room.json")}
  end

  def render("user_room.json", %{user_room: user_room}) do
    %{id: user_room.id,
      user_id: user_room.user_id,
      room_id: user_room.room_id}
  end
end

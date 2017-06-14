defmodule Sling.RoomChannel do
  use Sling.Web, :channel

  def join("room:" <> room_id, _params, socket) do
    room = Repo.get!(Sling.Room, room_id)

    page = Sling.Message
            |> where([m], m.id == ^room.id)
            |> order_by(desc: :inserted_at, desc: :id)
            |> preload(:user)
            |> Sling.Repo.paginate()

    response = %{
      room: Phoenix.View.render_one(room, Sling.RoomView, "room.json")
      messages: Phoenix.View.render_many(page.enties, Sling.MessageView, "message.json"),
      pagination: Sling.PageinationHelpers.pagination(page)
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end

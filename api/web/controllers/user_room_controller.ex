# defmodule Sling.UserRoomController do
#   use Sling.Web, :controller
#
#   alias Sling.UserRoom
#
#   def index(conn, _params) do
#     user_rooms = Repo.all(UserRoom)
#     render(conn, "index.json", user_rooms: user_rooms)
#   end
#
#   def create(conn, %{"user_room" => user_room_params}) do
#     changeset = UserRoom.changeset(%UserRoom{}, user_room_params)
#
#     case Repo.insert(changeset) do
#       {:ok, user_room} ->
#         conn
#         |> put_status(:created)
#         |> put_resp_header("location", user_room_path(conn, :show, user_room))
#         |> render("show.json", user_room: user_room)
#       {:error, changeset} ->
#         conn
#         |> put_status(:unprocessable_entity)
#         |> render(Sling.ChangesetView, "error.json", changeset: changeset)
#     end
#   end
#
#   def show(conn, %{"id" => id}) do
#     user_room = Repo.get!(UserRoom, id)
#     render(conn, "show.json", user_room: user_room)
#   end
#
#   def update(conn, %{"id" => id, "user_room" => user_room_params}) do
#     user_room = Repo.get!(UserRoom, id)
#     changeset = UserRoom.changeset(user_room, user_room_params)
#
#     case Repo.update(changeset) do
#       {:ok, user_room} ->
#         render(conn, "show.json", user_room: user_room)
#       {:error, changeset} ->
#         conn
#         |> put_status(:unprocessable_entity)
#         |> render(Sling.ChangesetView, "error.json", changeset: changeset)
#     end
#   end
#
#   def delete(conn, %{"id" => id}) do
#     user_room = Repo.get!(UserRoom, id)
#
#     # Here we use delete! (with a bang) because we expect
#     # it to always work (and if it does not, it will raise).
#     Repo.delete!(user_room)
#
#     send_resp(conn, :no_content, "")
#   end
# end

defmodule Sling.UserRoom do
  use Sling.Web, :model

  schema "user_rooms" do
    belongs_to :user, Sling.User
    belongs_to :room, Sling.Room

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [])
    |> validate_required([])
  end
end

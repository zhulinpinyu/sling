defmodule Sling.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Sling.Repo
  alias Sling.User

  def from_token(user = %User{}), do: {:ok, "User: #{user.id}"}
  def from_token(_), do: {:error, "Unknown resource type"}

  def from_token("User:" <> id), do: {:ok, Repo.get(User, String.to_integer(id))}
  def from_token(_), do: {:error, "Unknown resource type"}
end

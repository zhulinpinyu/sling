defmodule Sling.Repo do
  use Ecto.Repo, otp_app: :sling
  use Scrivener, page_size: 5
end

defmodule PaginationHelpers do
  def pagination(page) do
    %{
      page_numner: page.page_numner,
      page_size: page.page_size,
      total_pages: page.total_pages,
      total_entries: page.total_entries
    }
  end
end

package com.hamhabocca.dallibocca.qna.dto;

public class SearchFilter {

	private String category;

	private String title;

	public  SearchFilter() {

	}

	public SearchFilter(String category, String title) {
		this.category = category;
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public String toString() {
		return "SearchFilter{" +
			"category='" + category + '\'' +
			", title='" + title + '\'' +
			'}';
	}
}

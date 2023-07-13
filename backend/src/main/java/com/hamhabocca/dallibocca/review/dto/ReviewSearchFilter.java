package com.hamhabocca.dallibocca.review.dto;

public class ReviewSearchFilter {

    private String type;
    private String location;
    private String date;

    public ReviewSearchFilter() {
    }

    public ReviewSearchFilter(String type, String location, String date) {
        this.type = type;
        this.location = location;
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "ReviewSearchFilter{" +
            "type='" + type + '\'' +
            ", location='" + location + '\'' +
            ", date='" + date + '\'' +
            '}';
    }
}

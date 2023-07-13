package com.hamhabocca.dallibocca.rally.dto;

public class SearchFilter {

    private String type;
    private String location;
    private String date;
    private int distance;
    private int maximum;

    public SearchFilter() {
    }

    public SearchFilter(String type, String location, String date, int distance, int maximum) {
        this.type = type;
        this.location = location;
        this.date = date;
        this.distance = distance;
        this.maximum = maximum;
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

    public int getDistance() {
        return distance;
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }

    public int getmaximum() {
        return maximum;
    }

    public void setmaximum(int maximum) {
        this.maximum = maximum;
    }

    @Override
    public String toString() {
        return "SearchFilter{" +
            "type='" + type + '\'' +
            ", location='" + location + '\'' +
            ", date=" + date +
            ", distance=" + distance +
            ", maximum=" + maximum +
            '}';
    }
}

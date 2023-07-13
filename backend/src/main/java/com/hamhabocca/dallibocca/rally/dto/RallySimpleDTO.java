package com.hamhabocca.dallibocca.rally.dto;

public class RallySimpleDTO {

    private long rallyId;
    private String rallyStatus;
    private String rallyType;
    private String rallyName;
    private String rallyDate;
    private String rallyLocation;
    private String rallyWriteDate;

    public RallySimpleDTO() {
    }

    public RallySimpleDTO(long rallyId, String rallyStatus, String rallyType, String rallyName,
        String rallyDate, String rallyLocation, String rallyWriteDate) {
        this.rallyId = rallyId;
        this.rallyStatus = rallyStatus;
        this.rallyType = rallyType;
        this.rallyName = rallyName;
        this.rallyDate = rallyDate;
        this.rallyLocation = rallyLocation;
        this.rallyWriteDate = rallyWriteDate;
    }

    public long getRallyId() {
        return rallyId;
    }

    public void setRallyId(long rallyId) {
        this.rallyId = rallyId;
    }

    public String getRallyStatus() {
        return rallyStatus;
    }

    public void setRallyStatus(String rallyStatus) {
        this.rallyStatus = rallyStatus;
    }

    public String getRallyType() {
        return rallyType;
    }

    public void setRallyType(String rallyType) {
        this.rallyType = rallyType;
    }

    public String getRallyName() {
        return rallyName;
    }

    public void setRallyName(String rallyName) {
        this.rallyName = rallyName;
    }

    public String getRallyDate() {
        return rallyDate;
    }

    public void setRallyDate(String rallyDate) {
        this.rallyDate = rallyDate;
    }

    public String getRallyLocation() {
        return rallyLocation;
    }

    public void setRallyLocation(String rallyLocation) {
        this.rallyLocation = rallyLocation;
    }

    public String getRallyWriteDate() {
        return rallyWriteDate;
    }

    public void setRallyWriteDate(String rallyWriteDate) {
        this.rallyWriteDate = rallyWriteDate;
    }

    @Override
    public String toString() {
        return "RallySimpleDTO{" +
            "rallyId=" + rallyId +
            ", rallyStatus='" + rallyStatus + '\'' +
            ", rallyType='" + rallyType + '\'' +
            ", rallyName='" + rallyName + '\'' +
            ", rallyDate=" + rallyDate +
            ", rallyLocation='" + rallyLocation + '\'' +
            ", rallyWriteDate=" + rallyWriteDate +
            '}';
    }

}

package com.hamhabocca.dallibocca.rally.dto;

public class RallyMateDTO {

    private long id;
    private long rallyId;
    private long memberId;
    private String participationDate;
    private String isAccepted;

    public RallyMateDTO() {
    }

    public RallyMateDTO(long id, long rallyId, long memberId, String participationDate,
        String isAccepted) {
        this.id = id;
        this.rallyId = rallyId;
        this.memberId = memberId;
        this.participationDate = participationDate;
        this.isAccepted = isAccepted;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getRallyId() {
        return rallyId;
    }

    public void setRallyId(long rallyId) {
        this.rallyId = rallyId;
    }

    public long getMemberId() {
        return memberId;
    }

    public void setMemberId(long memberId) {
        this.memberId = memberId;
    }

    public String getParticipationDate() {
        return participationDate;
    }

    public void setParticipationDate(String participationDate) {
        this.participationDate = participationDate;
    }

    public String getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(String isAccepted) {
        this.isAccepted = isAccepted;
    }

    @Override
    public String toString() {
        return "RallyMateDTO{" +
            "id=" + id +
            ", rallyId=" + rallyId +
            ", memberId=" + memberId +
            ", participationDate=" + participationDate +
            ", isAccepted='" + isAccepted + '\'' +
            '}';
    }

}

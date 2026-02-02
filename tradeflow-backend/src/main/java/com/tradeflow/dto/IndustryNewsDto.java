package com.tradeflow.dto;

public class IndustryNewsDto {
    private String title;
    private String link;
    private String source;
    private String publishedDate;

    public IndustryNewsDto(String title, String link, String source, String publishedDate) {
        this.title = title;
        this.link = link;
        this.source = source;
        this.publishedDate = publishedDate;
    }

    public String getTitle() { return title; }
    public String getLink() { return link; }
    public String getSource() { return source; }
    public String getPublishedDate() { return publishedDate; }
}

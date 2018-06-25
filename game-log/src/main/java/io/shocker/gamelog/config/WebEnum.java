package io.shocker.gamelog.config;

public enum WebEnum {
    GameCategory("https://store.steampowered.com/","categories",
            "<div class=\"popup_menu_subheader\">Browse by genre:</div>","<div class=\"hr\"></div>",
            "a","class", "popup_menu_item","src\\main\\resources\\static\\gameCategoryCleaned.xsl"),
    Game(null,"games","<div id=\"tab_NewReleases_content\">","<div id=\"tab_TopSellers_content\" style=\"display: none;\">",
            "a","class", "tab_item","src\\main\\resources\\static\\gameCleaned.xsl");

    private String url;
    private String root;
    private String start;
    private String end;
    private String desElement;
    private String desAttribute;
    private String desAttributeValue;
    private String xslFilePath;

    WebEnum(String url, String root, String start, String end, String desElement, String desAttribute, String desAttributeValue, String xslFilePath) {
        this.url = url;
        this.root = root;
        this.start = start;
        this.end = end;
        this.desElement = desElement;
        this.desAttribute = desAttribute;
        this.desAttributeValue = desAttributeValue;
        this.xslFilePath = xslFilePath;
    }


    public String getUrl() {
        return url;
    }

    public String getRoot() {
        return root;
    }

    public String getStart() {
        return start;
    }

    public String getEnd() {
        return end;
    }

    public String getDesElement() {
        return desElement;
    }

    public String getDesAttribute() {
        return desAttribute;
    }

    public String getDesAttributeValue() {
        return desAttributeValue;
    }

    public String getXslFilePath() {
        return xslFilePath;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}

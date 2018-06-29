package io.shocker.gamelog.crawler;

import org.apache.commons.io.IOUtils;

import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.*;
import javax.xml.transform.stream.StreamSource;
import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class GameCrawler extends BasicCrawler {

    @Override
    public void appendTagContentToBuffer(StringBuffer sb, XMLEventReader reader,  StartElement element) {
        sb.append("<" + element.getName().toString());

        List<String> details = null;
        List<String> tags = null;
        XMLEvent event;
        Iterator iter = element.getAttributes();
        while (iter.hasNext()) {
            Attribute attr = (Attribute) iter.next();
            sb.append(" " + attr.getName().toString() + "=\"" + attr.getValue().replace("&", "&#38;") + "\"");
            if ("href".equals(attr.getName().toString())) {
                try {
                    details = gameDetail(attr.getValue());
                    tags = gameTags(attr.getValue());
                } catch (IOException ex) {
                    Logger.getLogger(GameCrawler.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
        }
        sb.append(">");
        //get detail
        if (details != null) {
            for (String line : details) {
                sb.append(line);
            }
        }
        if (tags != null) {
            for (String line : tags) {
                sb.append(line);
            }
        }
        ///getting all of that inner shit
        int endTagMarker = 0;
        String stName = "";
        while (endTagMarker >= 0) {
            try {
                event = reader.nextEvent();
                if (event.isEndElement()) {
                    EndElement ee = (EndElement) event;
                    sb.append(ee.toString());
                    endTagMarker--;
                }
                if (event.isStartElement()) {
                    StartElement se = (StartElement) event;
                    endTagMarker++;
                    stName = se.getName().toString();
                    sb.append("<" + stName);
                    Iterator childIter = se.getAttributes();
                    while (childIter.hasNext()) {
                        Attribute attr = (Attribute) childIter.next();
                        String value = attr.getValue();
                        value = value.replace("&", "&#38;");
                        sb.append(" " + attr.getName().toString() + "=\"" + value + "\"");
                    }
                    sb.append(">");
                }
                if (event.isCharacters()) {
                    Characters chars = (Characters) event;
                    if (!chars.isWhiteSpace()) {
                        sb.append(chars.getData().replace("&", "&#38;").trim());
                    }
                }
            } catch (XMLStreamException exception) {
                sb.append("</" + stName + ">");
                endTagMarker--;
            } catch (NullPointerException exception1) {
                break;
            }
        }
    }

    private List<String> gameDetail(String url) throws IOException {
        String start = "<div class=\"sysreq_contents\">";
        String end = "<div class=\"block\" id=\"recommended_block\">";

        BasicCrawler crawler = new BasicCrawler();
        StreamSource source = crawler.getDataFromWeb(url, "details", start, end);
        source = crawler.cleanXML(source, "details", "div", "class", "game_area_sys_req");
        InputStream is = source.getInputStream();
        List<String> lines = IOUtils.readLines(is, "UTF-8");
        return lines;
    }

    private List<String> gameTags(String url) throws IOException {
        String start = "<div class=\"glance_tags popular_tags\"";
        String end = "<div style=\"clear: both;\">";

        BasicCrawler crawler = new BasicCrawler();
        StreamSource source = crawler.getDataFromWeb(url, "details", start, end);
        source = crawler.cleanXML(source, "tags", "a", "class", "app_tag");
        InputStream is = source.getInputStream();
        List<String> lines = IOUtils.readLines(is, "UTF-8");
        return lines;
    }
}

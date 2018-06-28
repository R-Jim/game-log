/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package io.shocker.gamelog.crawler;


import com.sun.xml.internal.stream.events.XMLEventAllocatorImpl;
import io.shocker.gamelog.config.WebEnum;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

/**
 * @author Swomfire
 */
public class BasicCrawler {

    public StreamSource crawlingFromWeb(WebEnum entity) throws TransformerException {
        if (entity != null) {

            StreamSource source = getDataFromWeb(entity.getUrl(), entity.getRoot(), entity.getStart(), entity.getEnd());
            source = cleanXML(source, entity.getRoot(), entity.getDesElement(), entity.getDesAttribute(), entity.getDesAttributeValue());
            return validatingXML(source, entity.getXslFilePath());

        }
        return null;
    }

    public StreamSource getDataFromWeb(String url, String root, String start, String end) {
        List<String> sb = new ArrayList<>();
        String result = "";
        try {
            URL oracle = new URL(url);
            BufferedReader in = new BufferedReader(
                    new InputStreamReader(oracle.openStream()));

            String inputLine;
            boolean hereWeGo = false;
            sb.add("<" + root + ">" + "\n");
            boolean skip = false;
            while ((inputLine = in.readLine()) != null) {
                if (!skip) {
                    if (!hereWeGo && inputLine.contains(start)) {
                        hereWeGo = true;
                    } else if (hereWeGo && inputLine.contains(end)) {
                        hereWeGo = false;
                        int endTagCount = 1;
                        for (String tag : sb) {
                            Pattern pattern = Pattern.compile("<[/]\\w*[^/]>");
                            Matcher matcher = pattern.matcher(tag);
                            while (matcher.find()) {
                                endTagCount++;
                            }
                        }
                        for (String tag : sb) {
                            Pattern pattern = Pattern.compile("<\\w*(\\s+\\w+=\"[^<>]*\")*>");
                            Matcher matcher = pattern.matcher(tag);
                            while (matcher.find()) {
                                endTagCount--;
                            }
                        }
                        while (endTagCount > 0) {
                            sb.remove(sb.size() - 1);
                            endTagCount--;
                        }
                    } else if (hereWeGo && !inputLine.contains("<script")) {
                        inputLine = inputLine.replace("&", "&#38;")
                                .replace("&#38;nbsp;", "")
                                .replace("\t", "").replace("<br>", "").replace("</br>", "").replace("rel=nofollow ", "");
                        sb.add(inputLine.trim() + "\n");
                    }

                }
                if (hereWeGo) {
                    if (!skip && inputLine.contains("<script")) {
                        skip = true;
                    } else if (skip && inputLine.contains("</script>")) {
                        skip = false;
                    }
                }

            }
            in.close();
            sb.add("</" + root + ">" + "\n");
            result = sb.toString().replace(",", "").replace("[", "").replace("]", "");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        InputStream inputStream = new ByteArrayInputStream(result.getBytes());
        return new StreamSource(inputStream);
    }

    public StreamSource cleanXML(StreamSource source, String root, String desElement, String desAttribute, String desAttrValue) {
        XMLEventReader reader;
        StringBuffer sb = new StringBuffer();
        try {

            XMLInputFactory xif = XMLInputFactory.newInstance();
            xif.setEventAllocator(new XMLEventAllocatorImpl());

            reader = xif.createXMLEventReader(source.getInputStream());

            sb.append("<" + root + " xmlns='https://www.w3schools.com'>");
            if (reader != null) {
                String lastExp = "";
                while (reader.hasNext()) {
                    XMLEvent event;
                    try {
                        event = reader.nextEvent();
                        if (event != null) {
                            if (event.isStartElement()) {
                                StartElement element = (StartElement) event;
                                if (element.getName().toString().equals(desElement)) {
                                    Attribute a = element.getAttributeByName(new QName(desAttribute));
                                    if (a != null) {
                                        String[] values = a.getValue().trim().split(" ");
                                        String[] desValues = desAttrValue.split(" ");
                                        for (String value : values) {
                                            for (String desValue : desValues) {
                                                if (value.equals(desValue)) {
                                                    appendTagContentToBuffer(sb, reader, element);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } catch (XMLStreamException exception) {
                        if (lastExp.equals(exception.toString())) {
                            break;
                        }
                        lastExp = exception.toString();
                    } catch (NullPointerException | ArrayIndexOutOfBoundsException exception1) {
                        break;
                    }
                }
            }

            sb.append("</" + root + ">");

            InputStream inputStream = new ByteArrayInputStream(sb.toString().getBytes());
            return new StreamSource(inputStream);
        } catch (XMLStreamException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public void appendTagContentToBuffer(StringBuffer sb, XMLEventReader reader, StartElement element) {
        sb.append("<" + element.getName().toString());
        Iterator iter = element.getAttributes();
        while (iter.hasNext()) {
            Attribute attr = (Attribute) iter.next();
            sb.append(" " + attr.getName().toString() + "=\"" + attr.getValue().replace("&", "&#38;") + "\"");
        }
        sb.append(">");
        ///getting all of that inner shit
        int endTagMarker = 0;
        String stName = "";
        XMLEvent event;
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
                        sb.append(chars.getData().replace("&", "&#38;").trim() );
                    }
                }
            } catch (XMLStreamException exception) {
                if (!stName.equals("")) {
                    sb.append("</" + stName + ">");
                }
                endTagMarker--;
            } catch (NullPointerException exception1) {
                break;
            }
        }

        //end of getting that shit
    }

    public StreamSource validatingXML(StreamSource sources, String xslPath) throws TransformerException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();


        StreamResult streamResult = new StreamResult(outputStream);
        StreamSource xslCate = new StreamSource(xslPath);

        TransformerFactory factory = TransformerFactory.newInstance();

        Transformer transformer = factory.newTransformer();
        if (xslPath != null) {
            transformer = factory.newTransformer(xslCate);
        }
        transformer.transform(sources, streamResult);

        InputStream is = new ByteArrayInputStream(outputStream.toByteArray());

        return new StreamSource(is);
    }
}

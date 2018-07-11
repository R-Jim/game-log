package io.shocker.gamelog.service;

import io.shocker.gamelog.model.WebEntity;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.util.List;

public class WebEntityService {
    private final Logger logger = LogManager.getLogger(WebEntityService.class);

    public WebEntity.Web getWebEntity(String entityId) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance("io.shocker.gamelog.model");
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            File f = new File("webEntityConfig.xml");

            WebEntity webEntity = (WebEntity) unmarshaller.unmarshal(f);
            List<WebEntity.Web> list = webEntity.getWeb();
            for (WebEntity.Web web : list) {
                if (web.getId().equals(entityId)) {
                    return web;
                }
            }
        } catch (JAXBException e) {
            logger.log(Level.ERROR, e);
        }
        return null;
    }
}

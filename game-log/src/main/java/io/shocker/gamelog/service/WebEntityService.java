package io.shocker.gamelog.service;

import io.shocker.gamelog.config.GamaProperties;
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
    private final GamaProperties gamaProperties;

    public WebEntityService(GamaProperties gamaProperties) {
        this.gamaProperties = gamaProperties;
    }

    public WebEntity.Web getWebEntity(String entityId) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(gamaProperties.getJaxbModelPath());
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();

            File f = new File(gamaProperties.getSourcePath());

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

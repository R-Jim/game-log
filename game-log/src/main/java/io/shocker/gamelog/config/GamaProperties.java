package io.shocker.gamelog.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("gama.properties")
public class GamaProperties {

    @Value("${gama.pageSize}")
    private Integer itemPageSize;

    @Value("${gama.source}")
    private String sourcePath;

    @Value("${gama.jaxbModelPath}")
    private String jaxbModelPath;

    @Value("${crawler.game.pageSize}")
    private Integer gameCrawlerPageSize;

    @Value("${crawler.gear.pageSize}")
    private Integer gearCrawlerPageSize;

    @Value("${crawler.gear.extension}")
    private String gearCrawlerExtension;

    public Integer getItemPageSize() {
        return itemPageSize;
    }

    public String getSourcePath() {
        return sourcePath;
    }

    public String getJaxbModelPath() {
        return jaxbModelPath;
    }

    public Integer getGameCrawlerPageSize() {
        return gameCrawlerPageSize;
    }

    public Integer getGearCrawlerPageSize() {
        return gearCrawlerPageSize;
    }

    public String getGearCrawlerExtension() {
        return gearCrawlerExtension;
    }
}

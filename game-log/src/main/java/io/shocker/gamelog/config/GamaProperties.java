package io.shocker.gamelog.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("gama.properties")
public class GamaProperties {

    @Value("${gama.pageSize}")
    private Integer itemPageSize;

    public Integer getItemPageSize() {
        return itemPageSize;
    }
}

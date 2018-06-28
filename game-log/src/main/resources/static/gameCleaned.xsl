<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="https://www.w3schools.com">
    <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
    <xsl:template match="/">
        <games>
            <xsl:for-each select="//*[local-name()='a']">
                <xsl:element name="game">
                    <xsl:attribute name="id">
                        <xsl:value-of select="string(./@data-ds-appid)"/>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="normalize-space(.//*[contains(@class,'tab_item_name')]/text())"/>
                    </xsl:attribute>
                    <xsl:attribute name="href">
                        <xsl:value-of select="string(./@href)"/>
                    </xsl:attribute>
                    <xsl:attribute name="img">
                        <xsl:value-of select=".//*[local-name()='img']/@src"/>
                    </xsl:attribute>
                    <price>
                        <xsl:value-of select=".//*[contains(@class,'discount_final_price')]"/>
                    </price>
                    <xsl:variable name="spec" select=".//*[contains(@class,'game_area_sys_req_full')]"/>
                    <xsl:choose>
                        <xsl:when test="$spec">
                            <minimum>
                                <xsl:for-each
                                        select=".//*[contains(@data-os,'win')]/*[contains(@class,'game_area_sys_req_full')]//*[local-name()='li']">
                                    <xsl:if test="./*[local-name()='strong'] = 'OS:' or ./*[local-name()='strong'] = 'Processor:'
                                        or ./*[local-name()='strong'] = 'Memory:' or ./*[local-name()='strong'] = 'Graphics:'">
                                        <xsl:call-template name="specDetail">
                                            <xsl:with-param name="name"
                                                            select="translate(./*[local-name()='strong'],':','')"/>
                                            <xsl:with-param name="value" select="./text()"/>
                                        </xsl:call-template>
                                    </xsl:if>
                                </xsl:for-each>
                            </minimum>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:if test=".//*[contains(@data-os,'win')]/*[contains(@class,'game_area_sys_req_leftCol')]">
                                <minimum>
                                    <xsl:for-each
                                            select=".//*[contains(@data-os,'win')]/*[contains(@class,'game_area_sys_req_leftCol')]//*[local-name()='li']">
                                        <xsl:if test="./*[local-name()='strong'] = 'OS:' or ./*[local-name()='strong'] = 'Processor:'
                                        or ./*[local-name()='strong'] = 'Memory:' or ./*[local-name()='strong'] = 'Graphics:'">
                                            <xsl:call-template name="specDetail">
                                                <xsl:with-param name="name"
                                                                select="translate(./*[local-name()='strong'],':','')"/>
                                                <xsl:with-param name="value" select="./text()"/>
                                            </xsl:call-template>
                                        </xsl:if>
                                    </xsl:for-each>
                                </minimum>
                                <recommend>
                                    <xsl:for-each
                                            select=".//*[contains(@data-os,'win')]/*[contains(@class,'game_area_sys_req_rightCol')]//*[local-name()='li']">
                                        <xsl:if test="./*[local-name()='strong'] = 'OS:' or ./*[local-name()='strong'] = 'Processor:'
                                        or ./*[local-name()='strong'] = 'Memory:' or ./*[local-name()='strong'] = 'Graphics:'">
                                            <xsl:call-template name="specDetail">
                                                <xsl:with-param name="name"
                                                                select="translate(./*[local-name()='strong'],':','')"/>
                                                <xsl:with-param name="value" select="./text()"/>
                                            </xsl:call-template>
                                        </xsl:if>
                                    </xsl:for-each>
                                </recommend>
                            </xsl:if>
                        </xsl:otherwise>
                    </xsl:choose>
                    <tags>
                        <xsl:for-each select=".//*[local-name()='span' and contains(@class,'top_tag')]">
                            <tag>
                                <xsl:value-of select="translate(.,',','')"/>
                            </tag>
                        </xsl:for-each>
                    </tags>
                </xsl:element>
            </xsl:for-each>
        </games>
    </xsl:template>
    <xsl:template name="specDetail">
        <xsl:param name="name"/>
        <xsl:param name="value"/>
        <spec>
            <xsl:attribute name="name">
                <xsl:value-of select="$name"/>
            </xsl:attribute>
            <xsl:value-of select="$value"/>
        </spec>
    </xsl:template>
</xsl:stylesheet>
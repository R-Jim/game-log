<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="https://www.w3schools.com">
    <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
    <xsl:template match="/">
        <gears>
            <xsl:for-each select="//*[local-name()='a']">
                <xsl:element name="gear">
                    <xsl:attribute name="href">
                        <xsl:value-of select="string(./@href)"/>
                    </xsl:attribute>
                    <xsl:attribute name="img">
                        <xsl:value-of select="string(.//*[local-name()='img']/@src)"/>
                    </xsl:attribute>
                    <xsl:element name="name">
                        <xsl:value-of select="string(.//*[local-name()='h3' and contains(@class,'mf-plti-name')]/text())"/>
                    </xsl:element>
                    <xsl:element name="price">
                        <xsl:value-of select="concat(normalize-space(.//*[local-name()='p' and contains(@class,'mf-plti-price')]/text()),'đ')"/>
                    </xsl:element>
                    <xsl:element name="specs">
                        <xsl:for-each select=".//*[local-name()='div' and contains(@class,'mf-plti-ts')]//*[local-name()='li']">
                            <xsl:element name="spec">
                                <xsl:attribute name="name">
                                    <xsl:value-of select="translate(normalize-space(.//*[local-name()='label']),'&amp;; :','')"/>
                                </xsl:attribute>
                                <xsl:variable name="spec" select=".//*[local-name()='span']"/>
                                <xsl:choose>
                                    <xsl:when test="normalize-space($spec) != ''">
                                        <xsl:value-of select=".//*[local-name()='span']"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <xsl:value-of select="./text()"/>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:element>
                        </xsl:for-each>
                    </xsl:element>
                    <xsl:value-of select="./text()"/>
                </xsl:element>
            </xsl:for-each>
        </gears>
    </xsl:template>
</xsl:stylesheet>
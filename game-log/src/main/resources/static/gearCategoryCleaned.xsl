<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="https://www.w3schools.com">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
<xsl:template match="/">
    <categories>
        <xsl:for-each select="//*[local-name()='a']">
            <xsl:element name="category">
                <xsl:attribute name="href">
                    <xsl:value-of select="string(./@href)"/>
                </xsl:attribute>
                <xsl:value-of select="./text()"/>
            </xsl:element>
        </xsl:for-each>
    </categories>
</xsl:template>
</xsl:stylesheet>

package io.shocker.gamelog.model;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence maxOccurs="unbounded">
 *         &lt;element name="web">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="root" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="start" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="end" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="desElement" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="desAttribute" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="desAttributeValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                 &lt;/sequence>
 *                 &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="url" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="xslFilePath" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "web"
})
@XmlRootElement(name = "webEntity", namespace = "https://www.w3schools.com")
public class WebEntity {

    @XmlElement(namespace = "https://www.w3schools.com", required = true)
    protected List<WebEntity.Web> web;

    /**
     * Gets the value of the web property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the web property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getWeb().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link WebEntity.Web }
     * 
     * 
     */
    public List<WebEntity.Web> getWeb() {
        if (web == null) {
            web = new ArrayList<WebEntity.Web>();
        }
        return this.web;
    }


    /**
     * <p>Java class for anonymous complex type.
     * 
     * <p>The following schema fragment specifies the expected content contained within this class.
     * 
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence>
     *         &lt;element name="root" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="start" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="end" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="desElement" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="desAttribute" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="desAttributeValue" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *       &lt;/sequence>
     *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="url" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="xslFilePath" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     * 
     * 
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
        "root",
        "start",
        "end",
        "desElement",
        "desAttribute",
        "desAttributeValue"
    })
    public static class Web {

        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String root;
        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String start;
        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String end;
        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String desElement;
        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String desAttribute;
        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String desAttributeValue;
        @XmlAttribute(name = "id")
        protected String id;
        @XmlAttribute(name = "url")
        protected String url;
        @XmlAttribute(name = "xslFilePath")
        protected String xslFilePath;

        /**
         * Gets the value of the root property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getRoot() {
            return root;
        }

        /**
         * Sets the value of the root property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setRoot(String value) {
            this.root = value;
        }

        /**
         * Gets the value of the start property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getStart() {
            return start;
        }

        /**
         * Sets the value of the start property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setStart(String value) {
            this.start = value;
        }

        /**
         * Gets the value of the end property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getEnd() {
            return end;
        }

        /**
         * Sets the value of the end property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setEnd(String value) {
            this.end = value;
        }

        /**
         * Gets the value of the desElement property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getDesElement() {
            return desElement;
        }

        /**
         * Sets the value of the desElement property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setDesElement(String value) {
            this.desElement = value;
        }

        /**
         * Gets the value of the desAttribute property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getDesAttribute() {
            return desAttribute;
        }

        /**
         * Sets the value of the desAttribute property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setDesAttribute(String value) {
            this.desAttribute = value;
        }

        /**
         * Gets the value of the desAttributeValue property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getDesAttributeValue() {
            return desAttributeValue;
        }

        /**
         * Sets the value of the desAttributeValue property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setDesAttributeValue(String value) {
            this.desAttributeValue = value;
        }

        /**
         * Gets the value of the id property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getId() {
            return id;
        }

        /**
         * Sets the value of the id property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setId(String value) {
            this.id = value;
        }

        /**
         * Gets the value of the url property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getUrl() {
            return url;
        }

        /**
         * Sets the value of the url property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setUrl(String value) {
            this.url = value;
        }

        /**
         * Gets the value of the xslFilePath property.
         * 
         * @return
         *     possible object is
         *     {@link String }
         *     
         */
        public String getXslFilePath() {
            return xslFilePath;
        }

        /**
         * Sets the value of the xslFilePath property.
         * 
         * @param value
         *     allowed object is
         *     {@link String }
         *     
         */
        public void setXslFilePath(String value) {
            this.xslFilePath = value;
        }

    }

}

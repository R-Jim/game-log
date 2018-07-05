package io.shocker.gamelog.model;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_game")
@NamedStoredProcedureQueries({
        @NamedStoredProcedureQuery(name = "get_all_games", procedureName = "get_all_games")
})
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "price",
        "minimum",
        "recommend",
        "tags"
})
public class Game implements Serializable {

    @XmlElement(namespace = "https://www.w3schools.com", required = true)
    protected String price;
    @XmlElement(namespace = "https://www.w3schools.com")
    protected SpecDetail minimum;
    @XmlElement(namespace = "https://www.w3schools.com")
    protected SpecDetail recommend;
    @XmlElement(namespace = "https://www.w3schools.com", required = true)
    protected Tags tags;
    @XmlAttribute(name = "id")
    protected Integer id;
    @XmlAttribute(name = "name")
    protected String name;
    @XmlAttribute(name = "href")
    protected String href;
    @XmlAttribute(name = "img")
    protected String img;

    /**
     * Gets the value of the price property.
     *
     * @return possible object is
     * {@link String }
     */
    @Basic
    @Column(name = "price")
    public String getPrice() {
        return price;
    }

    /**
     * Sets the value of the price property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setPrice(String value) {
        this.price = value;
    }


    /**
     * Gets the value of the minimum property.
     *
     * @return possible object is
     * {@link SpecDetail }
     */
    @Transient
    public SpecDetail getMinimum() {
        return minimum;
    }

    /**
     * Sets the value of the minimum property.
     *
     * @param value allowed object is
     *              {@link SpecDetail }
     */
    public void setMinimum(SpecDetail value) {
        this.minimum = value;
    }

    /**
     * Gets the value of the recommend property.
     *
     * @return possible object is
     * {@link SpecDetail }
     */
    @Transient
    public SpecDetail getRecommend() {
        return recommend;
    }

    /**
     * Sets the value of the recommend property.
     *
     * @param value allowed object is
     *              {@link SpecDetail }
     */
    public void setRecommend(SpecDetail value) {
        this.recommend = value;
    }

    /**
     * Gets the value of the tags property.
     *
     * @return
     *     possible object is
     *     {@link model.Game.Tags }
     *
     */
    /**
     * Gets the value of the tags property.
     *
     * @return possible object is
     * {@link Tags }
     */
    @Transient
    public Tags getTags() {
        return tags;
    }

    /**
     * Sets the value of the tags property.
     *
     * @param value allowed object is
     *              {@link Tags }
     */
    public void setTags(Tags value) {
        this.tags = value;
    }

    /**
     * Gets the value of the id property.
     *
     * @return possible object is
     * {@link String }
     */
    @Id
    @Column(name = "id")
    public Integer getId() {
        return id;
    }

    /**
     * Sets the value of the id property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setId(Integer value) {
        this.id = value;
    }

    /**
     * Gets the value of the name property.
     *
     * @return possible object is
     * {@link String }
     */
    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    /**
     * Sets the value of the name property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Gets the value of the href property.
     *
     * @return possible object is
     * {@link String }
     */
    @Basic
    @Column(name = "href")
    public String getHref() {
        return href;
    }

    /**
     * Sets the value of the href property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setHref(String value) {
        this.href = value;
    }


    @Basic
    @Column(name = "img_src")
    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }


    /**
     * <p>Java class for anonymous complex type.
     * <p>
     * <p>The following schema fragment specifies the expected content contained within this class.
     * <p>
     * <pre>
     * &lt;complexType>
     *   &lt;complexContent>
     *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *       &lt;sequence maxOccurs="unbounded">
     *         &lt;element name="tag" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *       &lt;/sequence>
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     */
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
            "tag"
    })
    public static class Tags {

        @XmlElement(namespace = "https://www.w3schools.com")
        protected List<String> tag;

        /**
         * Gets the value of the tag property.
         * <p>
         * <p>
         * This accessor method returns a reference to the live list,
         * not a snapshot. Therefore any modification you make to the
         * returned list will be present inside the JAXB object.
         * This is why there is not a <CODE>set</CODE> method for the tag property.
         * <p>
         * <p>
         * For example, to add a new item, do as follows:
         * <pre>
         *    getTag().add(newItem);
         * </pre>
         * <p>
         * <p>
         * <p>
         * Objects of the following type(s) are allowed in the list
         * {@link String }
         */
        public List<String> getTag() {
            if (tag == null) {
                tag = new ArrayList<String>();
            }
            return this.tag;
        }

        public void setTag(List<String> tag) {
            this.tag = tag;
        }
    }

    @XmlTransient
    private Spec minimumEntity;

    @XmlTransient
    private Spec recommendEntity;

    @Transient
    public Spec getMinimumEntity() {
        return minimumEntity;
    }

    public void setMinimumEntity(Spec minimumEntity) {
        this.minimumEntity = minimumEntity;
    }

    @Transient
    public Spec getRecommendEntity() {
        return recommendEntity;
    }

    public void setRecommendEntity(Spec recommendEntity) {
        this.recommendEntity = recommendEntity;
    }
}

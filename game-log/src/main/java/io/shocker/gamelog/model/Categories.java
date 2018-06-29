
package io.shocker.gamelog.model;

import javax.persistence.*;
import javax.xml.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;


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
 *         &lt;element name="category">
 *           &lt;complexType>
 *             &lt;simpleContent>
 *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                 &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/extension>
 *             &lt;/simpleContent>
 *           &lt;/complexType>
 *         &lt;/element>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "category"
})
@XmlRootElement(name = "categories", namespace = "https://www.w3schools.com")
public class Categories {

    @XmlElement(namespace = "https://www.w3schools.com", required = true)
    protected List<Categories.Category> category;

    /**
     * Gets the value of the category property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the category property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCategory().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Categories.Category }
     */
    public List<Categories.Category> getCategory() {
        if (category == null) {
            category = new ArrayList<Categories.Category>();
        }
        return this.category;
    }

    public void setCategory(List<Category> categories) {
        this.category = categories;
    }

    public static List<Category> gameToCategoryList(List<GameCategory> gameCategories) {
        List<Category> categories = new ArrayList<>();
        for (GameCategory gameCategory : gameCategories) {
            categories.add(Category.toCategory(gameCategory));
        }
        return categories;
    }


    public static List<Category> gearToCategoryList(List<GearCategory> gearCategories) {
        List<Category> categories = new ArrayList<>();
        for (GearCategory gearCategory : gearCategories) {
            categories.add(Category.toCategory(gearCategory));
        }
        return categories;
    }
    /**
     * <p>Java class for anonymous complex type.
     * <p>
     * <p>The following schema fragment specifies the expected content contained within this class.
     * <p>
     * <pre>
     * &lt;complexType>
     *   &lt;simpleContent>
     *     &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/extension>
     *   &lt;/simpleContent>
     * &lt;/complexType>
     * </pre>
     */


    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
            "value"
    })
    public static class Category {

        @XmlValue
        protected String value;
        @XmlAttribute(name = "id")
        protected Integer id;
        @XmlAttribute(name = "href")
        protected String href;

        /**
         * Gets the value of the value property.
         *
         * @return possible object is
         * {@link String }
         */

        @Basic
        @Column(name = "name")
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         *
         * @param value allowed object is
         *              {@link String }
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the id property.
         *
         * @return possible object is
         * {@link String }
         */

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
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

        public GameCategory toGameCategory() {
            GameCategory gameCategory = new GameCategory();
            gameCategory.setId(this.id);
            gameCategory.setValue(this.value);
            gameCategory.setHref(this.href);
            return gameCategory;
        }

        public GearCategory toGearCategory() {
            GearCategory gearCategory = new GearCategory();
            gearCategory.setId(this.id);
            gearCategory.setValue(this.value);
            gearCategory.setHref(this.href);
            return gearCategory;
        }


        public static Category toCategory(GameCategory gameCategory) {
            Category category = new Category();
            category.setId(gameCategory.getId());
            category.setHref(gameCategory.getHref());
            category.setValue(gameCategory.getValue());
            return category;
        }

        public static Category toCategory(GearCategory gearCategory) {
            Category category = new Category();
            category.setId(gearCategory.getId());
            category.setHref(gearCategory.getHref());
            category.setValue(gearCategory.getValue());
            return category;
        }
    }

    @Entity
    @Table(name = "tbl_game_category")
    public static class GameCategory {

        protected Integer id;
        protected String value;
        protected String href;

        /**
         * Gets the value of the value property.
         *
         * @return possible object is
         * {@link String }
         */

        @Basic
        @Column(name = "name")
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         *
         * @param value allowed object is
         *              {@link String }
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the id property.
         *
         * @return possible object is
         * {@link String }
         */

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    }

    @Entity
    @Table(name = "tbl_gear_category")
    public static class GearCategory {

        protected Integer id;
        protected String value;
        protected String href;

        /**
         * Gets the value of the value property.
         *
         * @return possible object is
         * {@link String }
         */

        @Basic
        @Column(name = "name")
        public String getValue() {
            return value;
        }

        /**
         * Sets the value of the value property.
         *
         * @param value allowed object is
         *              {@link String }
         */
        public void setValue(String value) {
            this.value = value;
        }

        /**
         * Gets the value of the id property.
         *
         * @return possible object is
         * {@link String }
         */

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    }
}



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
 *         &lt;element name="gear">
 *           &lt;complexType>
 *             &lt;complexContent>
 *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                 &lt;sequence>
 *                   &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="price" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *                   &lt;element name="specs">
 *                     &lt;complexType>
 *                       &lt;complexContent>
 *                         &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *                           &lt;sequence maxOccurs="unbounded">
 *                             &lt;element name="spec">
 *                               &lt;complexType>
 *                                 &lt;simpleContent>
 *                                   &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
 *                                     &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                                   &lt;/extension>
 *                                 &lt;/simpleContent>
 *                               &lt;/complexType>
 *                             &lt;/element>
 *                           &lt;/sequence>
 *                         &lt;/restriction>
 *                       &lt;/complexContent>
 *                     &lt;/complexType>
 *                   &lt;/element>
 *                 &lt;/sequence>
 *                 &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" />
 *                 &lt;attribute name="img" type="{http://www.w3.org/2001/XMLSchema}string" />
 *               &lt;/restriction>
 *             &lt;/complexContent>
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
        "gear"
})
@XmlRootElement(name = "gears", namespace = "https://www.w3schools.com")
public class Gears {

    @XmlElement(namespace = "https://www.w3schools.com", required = true)
    protected List<Gears.Gear> gear;

    /**
     * Gets the value of the gear property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the gear property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getGear().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Gears.Gear }
     */
    public List<Gears.Gear> getGear() {
        if (gear == null) {
            gear = new ArrayList<Gears.Gear>();
        }
        return this.gear;
    }


    public void setGear(List<Gear> gear) {
        this.gear = gear;
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
     *       &lt;sequence>
     *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="price" type="{http://www.w3.org/2001/XMLSchema}string"/>
     *         &lt;element name="specs">
     *           &lt;complexType>
     *             &lt;complexContent>
     *               &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
     *                 &lt;sequence maxOccurs="unbounded">
     *                   &lt;element name="spec">
     *                     &lt;complexType>
     *                       &lt;simpleContent>
     *                         &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
     *                           &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
     *                         &lt;/extension>
     *                       &lt;/simpleContent>
     *                     &lt;/complexType>
     *                   &lt;/element>
     *                 &lt;/sequence>
     *               &lt;/restriction>
     *             &lt;/complexContent>
     *           &lt;/complexType>
     *         &lt;/element>
     *       &lt;/sequence>
     *       &lt;attribute name="id" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="href" type="{http://www.w3.org/2001/XMLSchema}string" />
     *       &lt;attribute name="img" type="{http://www.w3.org/2001/XMLSchema}string" />
     *     &lt;/restriction>
     *   &lt;/complexContent>
     * &lt;/complexType>
     * </pre>
     */
    @Entity
    @Table(name = "tbl_gear")
    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlType(name = "", propOrder = {
            "name",
            "price",
            "specs"
    })
    public static class Gear {

        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String name;
        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected String price;
        @XmlElement(namespace = "https://www.w3schools.com", required = true)
        protected Gears.Gear.Specs specs;
        @XmlAttribute(name = "id")
        protected Integer id;
        @XmlAttribute(name = "href")
        protected String href;
        @XmlAttribute(name = "img")
        protected String img;

        @XmlTransient
        protected String screen;
        @XmlTransient
        protected String cpu;
        @XmlTransient
        protected String ram;
        @XmlTransient
        protected String vga;
        @XmlTransient
        protected String os;
        @XmlTransient
        protected String weight;

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
         * Gets the value of the specs property.
         *
         * @return possible object is
         * {@link Gears.Gear.Specs }
         */
        @Transient
        public Gears.Gear.Specs getSpecs() {
            return specs;
        }

        /**
         * Sets the value of the specs property.
         *
         * @param value allowed object is
         *              {@link Gears.Gear.Specs }
         */
        public void setSpecs(Gears.Gear.Specs value) {
            this.specs = value;
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

        /**
         * Gets the value of the img property.
         *
         * @return possible object is
         * {@link String }
         */
        @Basic
        @Column(name = "img_src")
        public String getImg() {
            return img;
        }

        /**
         * Sets the value of the img property.
         *
         * @param value allowed object is
         *              {@link String }
         */
        public void setImg(String value) {
            this.img = value;
        }

        @Basic
        @Column(name = "screen")
        public String getScreen() {
            return screen;
        }

        public void setScreen(String screen) {
            this.screen = screen;
        }

        @Basic
        @Column(name = "cpu")
        public String getCpu() {
            return cpu;
        }

        public void setCpu(String cpu) {
            this.cpu = cpu;
        }

        @Basic
        @Column(name = "ram")
        public String getRam() {
            return ram;
        }

        public void setRam(String ram) {
            this.ram = ram;
        }

        @Basic
        @Column(name = "vga")
        public String getVga() {
            return vga;
        }

        public void setVga(String vga) {
            this.vga = vga;
        }

        @Basic
        @Column(name = "os")
        public String getOs() {
            return os;
        }

        public void setOs(String os) {
            this.os = os;
        }

        @Basic
        @Column(name = "weight")
        public String getWeight() {
            return weight;
        }

        public void setWeight(String weight) {
            this.weight = weight;
        }

        public void setUpSpec() {
            for (Specs.Spec spec : this.specs.getSpec()) {
                switch (spec.getName()) {
                    case "MagravenHigravenh":
                        this.screen = spec.getValue();
                        break;
                    case "CPU":
                        this.cpu = spec.getValue();
                        break;
                    case "Ram":
                        this.ram = spec.getValue();
                        break;
                    case "VGA":
                        this.vga = spec.getValue();
                        break;
                    case "HĐH":
                        this.os = spec.getValue();
                        break;
                    case "Nặng":
                        this.weight = spec.getValue();
                        break;
                }
            }
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
         *         &lt;element name="spec">
         *           &lt;complexType>
         *             &lt;simpleContent>
         *               &lt;extension base="&lt;http://www.w3.org/2001/XMLSchema>string">
         *                 &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
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
                "spec"
        })
        public static class Specs {

            @XmlElement(namespace = "https://www.w3schools.com", required = true)
            protected List<Gears.Gear.Specs.Spec> spec;

            /**
             * Gets the value of the spec property.
             * <p>
             * <p>
             * This accessor method returns a reference to the live list,
             * not a snapshot. Therefore any modification you make to the
             * returned list will be present inside the JAXB object.
             * This is why there is not a <CODE>set</CODE> method for the spec property.
             * <p>
             * <p>
             * For example, to add a new item, do as follows:
             * <pre>
             *    getSpec().add(newItem);
             * </pre>
             * <p>
             * <p>
             * <p>
             * Objects of the following type(s) are allowed in the list
             * {@link Gears.Gear.Specs.Spec }
             */
            public List<Gears.Gear.Specs.Spec> getSpec() {
                if (spec == null) {
                    spec = new ArrayList<Gears.Gear.Specs.Spec>();
                }
                return this.spec;
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
             *       &lt;attribute name="name" type="{http://www.w3.org/2001/XMLSchema}string" />
             *     &lt;/extension>
             *   &lt;/simpleContent>
             * &lt;/complexType>
             * </pre>
             */
            @XmlAccessorType(XmlAccessType.FIELD)
            @XmlType(name = "", propOrder = {
                    "value"
            })
            public static class Spec {

                @XmlValue
                protected String value;
                @XmlAttribute(name = "name")
                protected String name;

                /**
                 * Gets the value of the value property.
                 *
                 * @return possible object is
                 * {@link String }
                 */
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
                 * Gets the value of the name property.
                 *
                 * @return possible object is
                 * {@link String }
                 */
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

            }

        }

    }

}

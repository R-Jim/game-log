
package io.shocker.gamelog.model;



import javax.xml.bind.annotation.XmlRegistry;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the model package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {


    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: model
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link Categories }
     *
     */
    public Categories createCategories() {
        return new Categories();
    }

    /**
     * Create an instance of {@link Categories.Category }
     *
     */
    public Categories.Category createCategoriesCategory() {
        return new Categories.Category();
    }


    /**
     * Create an instance of {@link Games }
     *
     */
    public Games createGames() {
        return new Games();
    }

    /**
     * Create an instance of {@link SpecDetail }
     *
     */
    public SpecDetail createSpecDetail() {
        return new SpecDetail();
    }

    /**
     * Create an instance of {@link Game }
     *
     */
    public Game createGamesGame() {
        return new Game();
    }

    /**
     * Create an instance of {@link SpecDetail.Spec }
     *
     */
    public SpecDetail.Spec createSpecDetailSpec() {
        return new SpecDetail.Spec();
    }


    /**
     * Create an instance of {@link Game.Tags }
     *
     */
    public Game.Tags createGamesGameTags() {
        return new Game.Tags();
    }

    /**
     * Create an instance of {@link Gears }
     *
     */
    public Gears createGears() {
        return new Gears();
    }

    /**
     * Create an instance of {@link Gears.Gear }
     *
     */
    public Gears.Gear createGearsGear() {
        return new Gears.Gear();
    }

    /**
     * Create an instance of {@link Gears.Gear.Specs }
     *
     */
    public Gears.Gear.Specs createGearsGearSpecs() {
        return new Gears.Gear.Specs();
    }

    /**
     * Create an instance of {@link Gears.Gear.Specs.Spec }
     *
     */
    public Gears.Gear.Specs.Spec createGearsGearSpecsSpec() {
        return new Gears.Gear.Specs.Spec();
    }

}

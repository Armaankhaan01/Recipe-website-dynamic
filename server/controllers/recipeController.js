require('../models/database');

const { json } = require('express');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');


// GET / Homepage

exports.homepage = async (req, res) => {

    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).sort({ _id: -1 }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).sort({ _id: -1 }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).sort({ _id: -1 }).limit(limitNumber);

        const food = { latest, thai, american, chinese };


        res.render("index", { title: 'Cooking Blog - Home', categories, food })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured" })
    }
}

// GET / Categories
exports.exploreCategories = async (req, res) => {

    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render("categories", { title: 'Cooking Blog - Categories', categories })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured" })
    }
}






// GET / Categories/:id
// Category by id

exports.exploreCategoriesById = async (req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categoreis', categoryById });
    } catch (error) {
        res.satus(500).send({ message: error.message || "Error Occured" });
    }
}



//GET /recipe/:id
// Recipe Page
exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId = req.params.id;

        const recipe = await Recipe.findById(recipeId);
        res.render("recipe", { title: 'Cooking Blog - Recipe', recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured" })
    }
}

// POST /Search
// Search

exports.searchRecipe = async (req, res) => {
    try {
        //SearchTerm
        let searchTerm = await req.body.searchTerm;

        let recipe = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } });

        res.render('search', { title: 'Cooking Blog - Search', recipe, searchTerm })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured" })
    }
}


//GET /explore-latest
// Explore Latest
exports.exploreLatest = async (req, res) => {

    try {
        const limitNumber = 20;
        const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
        res.render("exploreLatest", { title: 'Cooking Blog - Latest', latest })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured" })
    }
}

//GET /explore-random
// Explore Random
exports.exploreRandom = async (req, res) => {

    try {
        let count = await Recipe.find({}).countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();

        res.render("exploreRandom", { title: 'Cooking Blog - Latest', recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured" })
    }
}


//GET /submit-recipe
// Submit Recipe
exports.submitRecipe = async (req, res) => {

    try {
        const infoErrorsObj = req.flash('infoErrors');
        const infoSubmitObj = req.flash('infoSubmit');
        res.render("submitRecipe", { title: 'Cooking Blog -Submit Recipe', infoErrorsObj, infoSubmitObj })
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured" })
    }
}

//POST /submit-recipe
// Submit Recipe
exports.submitRecipeOnPost = async (req, res) => {
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log("No Files Were Uploaded");
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name
            uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, (err) => {
                if (err) return res.status(500).send(err);
            })
        }



        console.log(req.body);
        const newRecipe = await new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });
        await newRecipe.save()

        
        req.flash('infoSubmit', 'Recipe has been added')
        res.redirect('/submit-recipe');
    } catch (error) {
        await req.flash('infoErrors', error)
        res.redirect('/submit-recipe');
    }
}

const updateRecipe = async()=>{
    try {
        const res = await Recipe.updateOne({name:'New Recipe'},{name:'New Recipe Updated'});
        res.n; // Number of Documents Matched
        res.nModified; // Number of Documents Modified
    } catch (error) {
        console.log(error);
    }
}
exports.deleteRecipe = async(req, res) => {
    const submissionId = req.params.id;
    
   await Recipe.findByIdAndRemove(submissionId, (error, Recipe) => {
      if (error) {
        return res.status(400).send({ error });
      }
      return res.send({ message: 'Submission deleted successfully' });
    });
}


























// For inserting in database

// async function insertDummyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 "name": "Thai",
//                 "image": "thai-food.jpg"
//             },
//             {
//                 "name": "American",
//                 "image": "american-food.jpg"
//             },
//             {
//                 "name": "Chinese",
//                 "image": "chinese-food.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "mexican-food.jpg"
//             },
//             {
//                 "name": "Indian",
//                 "image": "indian-food.jpg"
//             },
//             {
//                 "name": "Spanish",
//                 "image": "spanish-food.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log('err' + error);
//     }
// }

// insertDummyCategoryData();

// async function insertDymmyRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Baking Soda",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American",
//                 "image": "southern-friend-chicken.jpg"
//             },
//             {
//                 "name": "Pepprika",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1 level teaspoon baking powder",
//                     "1 level teaspoon cayenne pepper",
//                     "1 level teaspoon hot smoked paprika",
//                 ],
//                 "category": "American",
//                 "image": "southern-friend-chicken.jpg"
//             }, {
//                 "name": "Pepprika",
//                 "description": `Recipe Description Goes Here`,
//                 "email": "recipeemail@raddy.co.uk",
//                 "ingredients": [
//                     "1salevel teaspoon baking powder",
//                     "1 lsaevel teaspoon cayenne pepper",
//                     "1 levdel teaspoon hot smoked paprika",
//                 ],
//                 "category": "American",
//                 "image": "southern-friend-chicken.jpg"
//             }
//         ]);
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDymmyRecipeData();


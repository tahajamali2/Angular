import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode=false;
  recipeForm:FormGroup;
  objRecipe:Recipe;
  objIngredients:Ingredient[];

  constructor(private route:ActivatedRoute,private recipeService:RecipeService,private router:Router) {

   }

   get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=> {
      this.id = +params["id"];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
      
    })
  }

  onSubmit() {
    console.log(this.recipeForm);
    if(this.editMode) {
      this.objRecipe = this.recipeService.geRecipe(this.id);
      this.objRecipe.name = this.recipeForm.value['name'];
      this.objRecipe.imagePath = this.recipeForm.value['imagePath'];
      this.objRecipe.description = this.recipeForm.value['description'];
      this.objIngredients = [];
      for(let fg of (<FormArray>this.recipeForm.get('ingredients')).controls) {
        this.objIngredients.push(new Ingredient((<FormGroup>fg).controls['name'].value,parseInt((<FormGroup>fg).controls['amount'].value)))
      }
      this.objRecipe.ingredients = this.objIngredients;

      this.recipeService.updateRecipe(this.objRecipe,this.id);

    }
    else {
      this.objIngredients = [];
      for(let fg of (<FormArray>this.recipeForm.get('ingredients')).controls) {
        this.objIngredients.push(new Ingredient((<FormGroup>fg).controls['name'].value,parseInt((<FormGroup>fg).controls['amount'].value)))
      }
      this.objRecipe = new Recipe(this.recipeService.getNewID(),this.recipeForm.value['name'],this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],this.objIngredients);

      this.recipeService.addRecipe(this.objRecipe);
    }

    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(index:number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  private initForm() {
    
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients = new FormArray([]);
    

if(this.editMode) {
  const recipe  = this.recipeService.geRecipe(this.id);
  recipeName = recipe.name;
  recipeImagePath = recipe.imagePath;
  recipeDescription = recipe.description;
  if(recipe['ingredients']) {
    for(let ingredient of recipe.ingredients) {
      recipeIngredients.push(new FormGroup({
        'name':new FormControl(ingredient.name,Validators.required),
        'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      }))
    }
  }
}

this.recipeForm = new FormGroup({
  'name':new FormControl(recipeName,Validators.required),
  'imagePath':new FormControl(recipeImagePath,Validators.required),
  'description' :new FormControl(recipeDescription,Validators.required),
  'ingredients': recipeIngredients
});
  }

}

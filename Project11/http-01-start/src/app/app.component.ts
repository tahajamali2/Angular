import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Posts } from './post.model';
import { PostService } from './posts.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts:Posts[] = [];
  isFetching = false;
  error = null;
  private errorSub:Subscription;

  constructor(private http: HttpClient,private postService:PostService) {}

  ngOnInit() {
    this.fetchPosts();
   this.errorSub = this.postService.error.subscribe(error=> {
      this.error = error;
    })
  }

  onCreatePost(postData: NgForm) {
    // Send Http request
    console.log(postData);
    this.postService.createAndStorePost(postData.value.title,postData.value.content);
    postData.resetForm();
    
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe((res)=> {
      this.fetchPosts();
    })
  }

  private fetchPosts() {
    this.isFetching = true;
    this.error = null;
    this.postService.fetchPosts().subscribe((posts)=> {
      this.isFetching = false;
      this.loadedPosts = posts;
      this.error = null;
    },(error)=> {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  ngOnDestroy(): void {
      this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
  
}

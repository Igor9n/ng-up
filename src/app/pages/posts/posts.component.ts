import { Component, OnInit } from '@angular/core';
import { Post } from '../../services/post';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  displayedColumns: string[] = ['id', 'title', 'body', 'user_id'];

  constructor(private postService: PostsService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts = (): void => {
    this.postService
      .getPosts()
      .subscribe(posts => this.posts = posts);
  }
}

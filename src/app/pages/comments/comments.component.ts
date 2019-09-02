import { Component, OnInit } from '@angular/core';
import { Comment } from '../../services/comment';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: Comment[];
  displayedColumns: string[] = ['id', 'name', 'body', 'email', 'post_id', 'user_id'];

  constructor(private commentService: CommentsService) {
  }

  ngOnInit() {
    this.getComments();
  }

  getComments = (): void => {
    this.commentService
      .getComments()
      .subscribe(comments => this.comments = comments);
  }
}

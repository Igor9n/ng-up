import { Component, OnInit } from '@angular/core';
import { Comment } from '../../services/comment';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {
  comment: Comment;
  message: string;

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentsService) {
  }

  ngOnInit() {
  }

  getComment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.commentService
      .getComment(id)
      .subscribe({
        next: (comment) => {
          this.comment = comment;
        },
        error: (error) => {
          this.message = error.error;
        }
      });
  }

  delete(): void {
    this.commentService.deleteComment(this.comment.id)
      .subscribe({
        next: (response) => {
          this.message = response;
          this.comment = null;
        },
        error: (error) => {
          this.message = error.error;
        }
      });
  }
}

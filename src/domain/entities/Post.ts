export type PostProps = {
  id: string;
  userId: string;
  title: string;
  text: string;
  totalComments: number;
  createdAt: Date;
  updatedAt?: Date;
};

export class Post {
  public readonly id: string;

  public readonly userId: string;

  public readonly title: string;

  public readonly text: string;

  public readonly totalComments: number;

  public readonly createdAt: Date;

  public readonly updatedAt?: Date;

  constructor(props: PostProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.text = props.text;
    this.totalComments = props.totalComments;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

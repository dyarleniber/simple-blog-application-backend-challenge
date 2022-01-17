export type UserProps = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class User {
  public readonly id: string;

  public readonly name: string;

  public readonly username: string;

  public readonly email: string;

  public readonly password: string;

  public readonly createdAt: Date;

  public readonly updatedAt?: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.username = props.username;
    this.email = props.email;
    this.password = props.password;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}

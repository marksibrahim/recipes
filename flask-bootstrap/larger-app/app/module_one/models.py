from app import db

class Bucketlist(db.Model):
    """This class represents the bucketlist table."""

    __tablename__ = "bucketlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __init__(self, name):
        """initialize with name."""
        self.name = name

    @staticmethod
    def get_all():
        return Bucketlist.query.all()

    def __repr__(self):
        return "<Bucketlist: {}>".format(self.name)

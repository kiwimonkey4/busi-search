from sqlalchemy import Column, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Locations(Base):
    __tablename__ = 'locations'
    id = Column(UUID(as_uuid=True), primary_key=True)
    place_id = Column(String)
    website = Column(String)
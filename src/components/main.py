from argparse import ArgumentParser
import os
import uuid
import urllib.parse

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_cockroachdb import run_transaction

from models import Locations

def get_locations(session, place):
    locations = session.query(Locations).filter(Locations.place_id == place)
    return [i.website for i in locations]

def parse_cmdline():
    parser = ArgumentParser()
    parser.add_argument("url", help="Enter your node\'s connection string\n")
    opt = parser.parse_args()
    print(opt)
    return opt

if __name__ == '__main__':
    opt = parse_cmdline()
    conn_string = opt.url

    try:
        db_uri = os.path.expandvars(conn_string)
        db_uri = urllib.parse.unquote(db_uri)

        psycopg_uri = db_uri.replace(
            'postgresql://', 'cockroachdb://').replace(
                'postgres://', 'cockroachdb://').replace(
                    '26257?', '26257/bank?')
        engine = create_engine(psycopg_uri)
    except Exception as e:
        print('Failed to connect to database.')
        print('{0}'.format(e))

    print(run_transaction(sessionmaker(bind=engine),
                    lambda s: get_locations(s, "ChIJ2-plkcJvK4gRfESyR9Xipvc")))
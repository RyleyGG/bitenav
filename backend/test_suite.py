from conftest import db_session

def test_success(db_session):
    assert 3 == 3

def test_failure(db_session):
    assert 4 == 3
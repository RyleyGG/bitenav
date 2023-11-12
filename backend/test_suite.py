from models.dto_models import SignUpInfo
from services.config_service import logger
from conftest import testClient, dbSession

_accessToken = None

def test_sign_up(testClient, dbSession, overrideDbDepend):
    res = testClient.post(
        '/auth/sign_up',
        json={
            'email_address':'test@test.com',
            'first_name':'joe',
            'last_name':'test',
            'password':'123'
        }
    )

    logger.debug(res.json())
    assert res.status_code == 200

def test_sign_in(testClient, dbSession, overrideDbDepend):
    global _accessToken

    res = testClient.post(
        '/auth/sign_in',
        json={
            'email_address':'test@test.com',
            'password':'123'
        }
    )

    if res.status_code == 200:
        _accessToken = res.json()['access_token']

    assert res.status_code == 200

def test_basic_auth_check(testClient, dbSession):
    logger.debug(_accessToken)
    res = testClient.get('/', headers={'Authorization': f'Bearer {_accessToken}'})

    assert res.status_code == 200
    assert res.json()['message'] == 'Hello World'
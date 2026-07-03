from fastapi import Request

def get_traffic_service(request: Request):
    return request.app.state.traffic_service


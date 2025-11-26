from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPBadRequest
from ..models import Matakuliah

@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def matakuliah_list(request):
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}

@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def matakuliah_detail(request):
    mk = request.dbsession.query(Matakuliah).filter_by(id=request.matchdict['id']).first()
    if not mk: return HTTPNotFound(json_body={'error': 'Not found'})
    return {'matakuliah': mk.to_dict()}

@view_config(route_name='matakuliah_add', renderer='json', request_method='POST')
def matakuliah_add(request):
    try:
        data = request.json_body
        new_mk = Matakuliah(kode_mk=data['kode_mk'], nama_mk=data['nama_mk'], sks=int(data['sks']), semester=int(data['semester']))
        request.dbsession.add(new_mk)
        request.dbsession.flush()
        return {'success': True, 'matakuliah': new_mk.to_dict()}
    except Exception as e: return HTTPBadRequest(json_body={'error': str(e)})

@view_config(route_name='matakuliah_update', renderer='json', request_method='PUT')
def matakuliah_update(request):
    mk = request.dbsession.query(Matakuliah).filter_by(id=request.matchdict['id']).first()
    if not mk: return HTTPNotFound(json_body={'error': 'Not found'})
    data = request.json_body
    if 'nama_mk' in data: mk.nama_mk = data['nama_mk']
    if 'sks' in data: mk.sks = int(data['sks'])
    return {'success': True, 'matakuliah': mk.to_dict()}

@view_config(route_name='matakuliah_delete', renderer='json', request_method='DELETE')
def matakuliah_delete(request):
    mk = request.dbsession.query(Matakuliah).filter_by(id=request.matchdict['id']).first()
    if not mk: return HTTPNotFound(json_body={'error': 'Not found'})
    request.dbsession.delete(mk)
    return {'success': True}
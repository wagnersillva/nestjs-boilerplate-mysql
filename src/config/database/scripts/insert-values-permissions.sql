-- users module
INSERT INTO permission (id, name) VALUES ('e4a55a94-1b8f-4939-9c5e-d65a9126d299', 'CREATE_USER');
INSERT INTO permission (id, name) VALUES ('b5f132f5-7b6f-4ea0-ae85-ee56c2e7a22c', 'READ_USER');
INSERT INTO permission (id, name) VALUES ('d53e56a1-af5f-40c7-8ee1-2adbc8e0d7d0', 'UPDATE_USER');
INSERT INTO permission (id, name) VALUES ('c1d8c39a-7540-4053-a36c-43db5fb7b8fe', 'DELETE_USER');

-- roles module
INSERT INTO permission (id, name) VALUES ('a8b7d1be-4312-4b07-8f1c-051c8406a893', 'CREATE_ROLE');
INSERT INTO permission (id, name) VALUES ('c78d248e-6496-4dce-9a8b-936c1184e28a', 'READ_ROLE');
INSERT INTO permission (id, name) VALUES ('e01e4a87-cb1f-4460-8f24-b2b7f43fb9a5', 'UPDATE_ROLE');
INSERT INTO permission (id, name) VALUES ('dc64364e-d5f9-4e49-8d6c-109a2f40871c', 'DELETE_ROLE');
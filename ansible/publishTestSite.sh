#!/usr/bin/env sh

# sudo certbot certonly --webroot -w /var/www/html -d ace-test.pearwoodtech.com

ansible-playbook \
    -i testing \
    site.yml \
    --ask-pass \
    --ask-become-pass \
    --ask-vault-pass \
    --tags publish

#!/usr/bin/env sh

ansible-playbook \
    -i testing \
    site.yml \
    --ask-pass \
    --ask-become-pass \
    --ask-vault-pass

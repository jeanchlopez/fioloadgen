#!/usr/bin/env python3

from .base import BaseHandler

# import shutil
import subprocess


class OpenshiftHandler(BaseHandler):

    _target = "Openshift Cluster"
    _cmd = 'oc'
    _connection_test = 'oc status'

    def __init__(self, ns='fio', mgr='fiomgr'):
        self.ns = ns
        self.mgr = mgr

    # @property
    # def _can_run(self):
    #     return shutil.which(self._cmd) is not None

    # @property
    # def has_connection(self):
    #     if self._can_run:
    #         r = subprocess.run(self._connection_test.split(' '), capture_output=True)
    #         return r.returncode == 0
    #     else:
    #         return False

    def startfio(self, profile, workers, output):
        cmd = 'startfio'
        args = '-p {} -w {} -o {}'.format(profile, workers, output)
        o = subprocess.run(['oc', '-n', self.ns, 'exec', '-it', self.mgr, '--', cmd, args])

        return o.returncode

    def fetch_report(self, output):
        o = subprocess.run(['oc', '-n', self.ns, 'rsync', '{}:/reports/{}'.format(self.mgr, output), '/tmp'])
        return o.returncode

    def runcommand(self, command):
        pass


class KubernetesHandler(OpenshiftHandler):
    _target = "Kubernetes Cluster"
    _cmd = 'kubectl'
    _connection_test = 'kubectl status'
# -*- coding: iso-8859-1 -*-
"""test mail checking"""
# Copyright (C) 2004  Bastian Kleineidam
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.

import unittest

import linkcheck.ftests

class TestMail (linkcheck.ftests.StandardTest):
    """test mailto: link checking"""

    needed_resources = ['network']

    def test_good_mail (self):
        """test some good mailto addrs"""
        url = self.norm(u"mailto:Dude <calvin@users.sf.net> , "\
                "Killer <calvin@users.sourceforge.net>?subject=bla")
        resultlines = [
          u"url %s" % url,
          u"cache key mailto:calvin@users.sf.net,calvin@users.sourceforge.net",
          u"real url %s" % url,
          u"info Verified address: <calvin> is deliverable.",
          u"valid",
        ]
        self.direct(url, resultlines)
        url = self.norm(u"mailto:Bastian Kleineidam <calvin@users.sf.net>?"\
                "bcc=calvin%40users.sourceforge.net")
        resultlines = [
          u"url %s" % url,
          u"cache key mailto:calvin@users.sf.net,calvin@users.sourceforge.net",
          u"real url %s" % url,
          u"info Verified address: <calvin> is deliverable.",
          u"valid",
        ]
        self.direct(url, resultlines)
        url = self.norm(u"mailto:Bastian Kleineidam <calvin@users.sf.net>")
        resultlines = [
            u"url %s" % url,
            u"cache key mailto:calvin@users.sf.net",
            u"real url %s" % url,
            u"info Verified address: <calvin> is deliverable.",
            u"valid",
        ]
        self.direct(url, resultlines)
        url = self.norm(u"mailto:o'hara@users.sf.net")
        resultlines = [
            u"url %s" % url,
            u"cache key mailto:o'hara@users.sf.net",
            u"real url %s" % url,
            u"info Verified address: <o'hara> is deliverable.",
            u"valid",
        ]
        self.direct(url, resultlines)
        url = self.norm(u"mailto:?to=calvin@users.sf.net&subject=blubb&"\
                "cc=calvin_cc@users.sf.net&CC=calvin_CC@users.sf.net")
        resultlines = [
            u"url %s" % url,
            u"cache key mailto:calvin@users.sf.net,calvin_CC@users.sf.net,calvin_cc@users.sf.net",
            u"real url %s" % url,
            u"info Verified address: <calvin> is deliverable.",
            u"info Verified address: <calvin_cc> is deliverable.",
            u"info Verified address: <calvin_CC> is deliverable.",
            u"valid",
        ]
        self.direct(url, resultlines)
        url = self.norm(u"mailto:news-admins@freshmeat.net?subject="\
                "Re:%20[fm%20#11093]%20(news-admins)%20Submission%20"\
                "report%20-%20Pretty%20CoLoRs")
        resultlines = [
            u"url %s" % url,
            u"cache key mailto:news-admins@freshmeat.net",
            u"real url %s" % url,
            u"valid",
        ]
        self.direct(url, resultlines)
        url = self.norm(u"mailto:foo@foo-bar.de?subject=test")
        resultlines = [
            u"url %s" % url,
            u"cache key mailto:foo@foo-bar.de",
            u"real url %s" % url,
            u"valid",
        ]
        self.direct(url, resultlines)

    def test_warn_mail (self):
        """test some mailto addrs with warnings"""
        # contains non-quoted characters
        url = u"mailto:calvin@users.sf.net?subject=���"
        qurl = self.norm(url)
        resultlines = [
            u"url %s" % url,
            u"cache key mailto:calvin@users.sf.net",
            u"real url %s" % qurl,
            u"info Verified address: <calvin> is deliverable.",
            u"warning Base URL is not properly normed. Normed url is %s." % qurl,
            u"valid",
        ]
        self.direct(url, resultlines)
        url = u"mailto:calvin@users.sf.net?subject=Halli hallo"
        qurl = self.norm(url)
        resultlines = [
            u"url %s" % url,
            u"cache key mailto:calvin@users.sf.net",
            u"real url %s" % qurl,
            u"info Verified address: <calvin> is deliverable.",
            u"warning Base URL is not properly normed. Normed url is %s." % qurl,
            u"valid",
        ]
        self.direct(url, resultlines)
        url = self.norm(u"mailto:")
        resultlines = [
            u"url %s" % url,
            u"cache key %s" % url,
            u"real url %s" % url,
            u"warning No addresses found.",
            u"valid",
        ]
        self.direct(url, resultlines)

    def test_bad_mail (self):
        """test some mailto addrs with bad syntax"""
        # ? extension forbidden in <> construct
        url = self.norm(u"mailto:Bastian Kleineidam "\
                         "<calvin@users.sf.net?foo=bar>")
        resultlines = [
            u"url %s" % url,
            u"cache key None",
            u"real url %s" % url,
            u"error",
        ]
        self.direct(url, resultlines)


def test_suite ():
    """build and return a TestSuite"""
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(TestMail))
    return suite


if __name__ == '__main__':
    unittest.main()

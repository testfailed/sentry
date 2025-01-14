from sentry.metrics.statsd import StatsdMetricsBackend
from sentry.testutils import TestCase
from sentry.utils.compat.mock import patch


class StatsdMetricsBackendTest(TestCase):
    def setUp(self):
        self.backend = StatsdMetricsBackend(prefix="sentrytest.")

    @patch("statsd.StatsClient.incr")
    def test_incr(self, mock_incr):
        self.backend.incr("foo")
        mock_incr.assert_called_once_with("sentrytest.foo", 1, 1)

    @patch("statsd.StatsClient.timing")
    def test_timing(self, mock_timing):
        self.backend.timing("foo", 30)
        mock_timing.assert_called_once_with("sentrytest.foo", 30, 1)

    @patch("statsd.StatsClient.gauge")
    def test_gauge(self, mock_gauge):
        self.backend.gauge("foo", 5)
        mock_gauge.assert_called_once_with("sentrytest.foo", 5, 1)

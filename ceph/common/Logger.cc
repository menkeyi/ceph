
#include <string>

#include "LogType.h"
#include "Logger.h"

#include <iostream>
#include "Clock.h"

#include "include/config.h"


Logger::Logger(string fn, LogType *type)
{
  filename = "log/";
  if (g_conf.log_name) {
	filename += g_conf.log_name;
	filename += "/";
  }
  filename += fn;
  //cout << "log " << filename << endl;
  interval = g_conf.log_interval;
  start = g_clock.gettimepair();  // time 0!
  last_logged = 0;
  wrote_header = -1;
  open = false;
  this->type = type;
  wrote_header_last = 0;
}

Logger::~Logger()
{
  flush(true);
  out.close();
}

long Logger::inc(const char *key, long v)
{
  if (!g_conf.log) return 0;
  lock.Lock();
  if (!type->have_key(key)) 
	type->add_inc(key);
  flush();
  vals[key] += v;
  long r = vals[key];
  lock.Unlock();
  return r;
}

long Logger::set(const char *key, long v)
{
  if (!g_conf.log) return 0;
  lock.Lock();
  if (!type->have_key(key)) 
	type->add_set(key);

  flush();
  vals[key] = v;
  long r = vals[key];
  lock.Unlock();
  return r;
}

long Logger::get(const char* key)
{
  if (!g_conf.log) return 0;
  lock.Lock();
  long r = vals[key];
  lock.Unlock();
  return r;
}

void Logger::flush(bool force) 
{
  if (!g_conf.log) return;
  lock.Lock();

  timepair_t now = g_clock.gettimepair();
  timepair_t fromstart = now - start;

  while (force ||
		 fromstart.first - last_logged >= interval) {
	last_logged += interval;
	force = false;

	//cout << "logger " << this << " advancing from " << last_logged << " now " << now << endl;

	if (!open) {
	  out.open(filename.c_str(), ofstream::out);
	  open = true;
	  //cout << "opening log file " << filename << endl;
	}

	// header?
	wrote_header_last++;
	if (wrote_header != type->version ||
		wrote_header_last > 10) {
	  out << "#";
	  for (vector<const char*>::iterator it = type->keys.begin(); it != type->keys.end(); it++) {
		out << "\t" << *it;
	  }
	  out << endl;
	  wrote_header = type->version;
	  wrote_header_last = 0;
	}

	// write line to log
	out << last_logged;
	for (vector<const char*>::iterator it = type->keys.begin(); it != type->keys.end(); it++) {
	  out << "\t" << get(*it);
	}
	out << endl;

	// reset the counters
	for (vector<const char*>::iterator it = type->inc_keys.begin(); it != type->inc_keys.end(); it++) 
	  this->vals[*it] = 0;
  }

  lock.Unlock();
}





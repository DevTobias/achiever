echo never > /sys/kernel/mm/transparent_hugepage/enabled
echo never > /sys/kernel/mm/transparent_hugepage/defrag

sysctl -w net.core.somaxconn=512
sysctl vm.overcommit_memory=1

# redis-server /usr/local/etc/redis/redis.conf --loadmodule /usr/lib/redis/modules/rejson.so --requirepass $1
# redis-server /usr/local/etc/redis/redis.conf --requirepass $1
redis-server --requirepass $1

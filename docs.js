/**
  Creates an object which uses an
  {@link https://lmax-exchange.github.io/disruptor/|LMAX Disruptor}
  to store data in shared memory.

  @param {string} shm_name - Name of shared memory object to use (see {@link http://pubs.opengroup.org/onlinepubs/009695399/functions/shm_open.html|shm_open}).
  @param {integer} num_elements - Number of elements in the Disruptor (i.e. its capacity).
  @param {integer} element_size - Size of each element in bytes.
  @param {integer} num_consumers - Total number of objects that will be reading data from the Disruptor.
  @param {integer} consumer - Each object that reads data from the Disruptor must have a unique ID. This should be a number between 0 and `num_consumers - 1`. If the object is only going to write data, `consumer` can be anything.
  @param {boolean} init - Whether to create and initialize the shared memory backing the Disruptor. You should arrange your application so this is done once, at the start.
  @param {boolean} spin - If `true` then methods on this object which read from the Disruptor won't return to your application until a value is ready. Methods which write to the Disruptor won't return while the Disruptor is full. The `*Sync` methods will block Node's main thread and the asynchronous methods will repeatedly post tasks to the thread pool, in order to let other tasks get a look in. If you want to implement your own retry algorithm (or use some out-of-band notification mechanism), specify `spin` as `false` and check method return values.
 */
class Disruptor
{
    constructor(shm_name, num_elements, element_size, num_consumers, consumer, init, spin)
    {
    }

    /**
      Reserve the next element in the Disruptor for writing data into.

      @param {produceClaimCallback} cb - Called once an element has been reserved, or `spin` (see the {@link Disruptor|constructor}) is `false` and the Disruptor is full.
     */
    produceClaim(cb)
    {
    }

    /**
      Reserve the next element in the Disruptor for writing data into.

      @returns {Buffer} - Buffer for writing data to the Disruptor. If the Disruptor was full and `spin` (see the {@link Disruptor|constructor}) is `false`, the buffer will be empty. Otherwise its length will be `element_size`. The buffer is backed by shared memory so may be overwitten after you call {@link produceCommit} or {@link produceCommitSync}.
     */
    produceClaimSync()
    {
    }

    /**
      Reserve a number of elements in the Disruptor for writing data into.

      @param {integer} n - Number of elements to reserve.
      @param {produceClaimManyCallback} cb - Called once the elements have been reserved, or `spin` (see the {@link Disruptor|constructor}) is `false` and the Disruptor didn't have enough free elements.
     */
    produceClaimMany(n, cb)
    {
    }

    /**
      Reserve a number of elements in the Disruptor for writing data into.

      @param {integer} n - Number of elements to reserve.
      @returns {Buffer[]} - Array of buffers for writing data to the Disruptor. If the Disruptor didn't have enough free elements and `spin` (see the {@link Disruptor|constructor}) is `false`, the array will be empty. Otherwise, it will contain at least one buffer and each buffer will be a multiple of `element_size` in length. The total size of the buffers in the array will be `n * element_size`. The buffers are backed by shared memory so may be overwritten after you call {@link produceCommit} or {@link produceCommitSync}.
     */
    produceClaimManySync(n)
    {
    }

    /**
      Commit data to the Disruptor. Call this once you've finished writing data
      to buffers you reserved.

      @param {Buffer|Buffer[]} buf_or_bufs - Buffer or buffers you reserved by calling {@link produceClaim}, {@link produceClaimSync}, {@link produceClaimMany} or {@link produceClaimManySync}.
      @param {produceCommitCallback} cb - Called once the elements in the buffers have been committed to the Disruptor, or `spin` (see the {@link Disruptor|constructor}) is `false` and the elements couldn't be committed (because other producers haven't committed their data yet). No copying occurs during the operation.
     */
    produceCommit(buf_or_bufs, cb)
    {
    }

    /**
      Commit data to the Disruptor. Call this once you've finished writing data
      to buffers you reserved.

      @param {Buffer|Buffer[]} buf_or_bufs - Buffer or buffers you reserved by calling {@link produceClaim}, {@link produceClaimSync}, {@link produceClaimMany} or {@link produceClaimManySync}.
      @returns {boolean} - Whether the data was committed to the Disruptor. If some elements reserved before `buf_or_bufs` remain uncommitted and `spin` (see the {@link Disruptor|constructor}) is `false`, the return value will be `false`. Otherwise the data was committed and the return value will be `true`.
      */
    produceCommitSync(buf_or_bufs)
    {
    }

    /**
      Read new data from the Disruptor.

      Elements written to since {@link consumeNew}, {@link consumeNewSync} or
      {@link consumeCommit} were called on this object are passed to `cb`.

      A call to {@link consumeCommit} is made before checking for new data.

      @param {consumeNewCallback} cb - Called once new elements are ready,
      or `spin` (see the {@link Disruptor|constructor}) is `false` and no
      elements have been written to the Disruptor.
     */
    consumeNew(cb)
    {
    }

    /**
      Read new data from the Disruptor.

      Elements written to since {@link consumeNew}, {@link consumeNewSync} or
      {@link consumeCommit} were called on this object are returned.

      A call to {@link consumeCommit} is made before checking for new data.

      @returns {Buffer[]} - Array of buffers containing new data ready to read from the Disruptor. If no new data was available and `spin` (see the {@link Disruptor|constructor}) is `false`, the array will be empty. Otherwise it will contain at least one buffer and each buffer will be a multiple of `element_size` in length. The buffers are backed by shared memory so may be overwritten after you call {@link consumeCommit}.
     */
    consumeNewSync()
    {
    }

    /**
      Tell the Disruptor you've finished reading data. Call this once you've
      finished with buffers returned by {@link consumeNew} or
      {@link consumeNewSync}.

      This is called by {@link consumeNew} and {@link consumeNewSync} before
      they check for new data.
     */
    consumeCommit()
    {
    }

    /**
      Detaches from the shared memory backing the Disruptor.

      Although this will be called when the object is garbage collected,
      you can force the shared memory to be unmapped by calling this function.

      Don't use the object again afterwards!
     */
    release()
    {
    }
}

/**
  Callback type for reserving a single element in the Disruptor for writing.

  @param {?Error} err - Error, if one occurred.
  @param {Buffer} buf - Buffer for writing data to the Disruptor. If the Disruptor was full and `spin` (see the {@link Disruptor|constructor}) is `false`, `buf` will be empty. Otherwise its length will be `element_size`. `buf` is backed by shared memory so may be overwritten after you call {@link produceCommit} or {@link produceCommitSync}.
 */
function produceClaimCallback(err, buf)
{
}

/**
  Callback type for reserving a number of elements in the Disruptor for writing.

  @param {?Error} err - Error, if one occurred.
  @param {Buffer[]} bufs - Array of buffers for writing data to the Disruptor. If the Disruptor didn't have enought free elements and `spin` (see the {@link Disruptor|constructor}) is `false`, `bufs` will be empty. Otherwise, it will contain at least one buffer and each buffer will be a multiple of `element_size` in length. The total size of the buffers in `bufs` will be `n * element_size`. The buffers are backed by shared memory so may be overwritten after you call {@link produceCommit} or {@link produceCommitSync}.
 */
function produceClaimManyCallback(err, bufs)
{
}

/**
  Callback type for commiting data to the Disruptor

  @param {?Error} err - Error, if one occurred.
  @param {boolean} committed - Whether the data was committed to the Disruptor. If some elements reserved before `buf_or_bufs` remain uncommitted and `spin` (see the {@link Disruptor|constructor}) is `false`, `committed` will be `false`. Otherwise the data was committed and `committed` will be `true`.
 */
function produceCommitCallback(err, committed)
{
}

/**
  Callback type for reading new data from the Disruptor

  @param {?Error} err - Error, if one occurred.
  @param {Buffer[]} bufs - Array of buffers containing new data ready to read from the Disruptor. If no new data was available and `spin` (see the {@link Disruptor|constructor}) is `false`, the array will be empty. Otherwise it will contain at least one buffer and each buffer will be a multiple of `element_size` in length. The buffers are backed by shared memory so may be overwritten after you call {@link consumeCommit}.
 */
function consumeNewCallback(err, bufs)
{
}